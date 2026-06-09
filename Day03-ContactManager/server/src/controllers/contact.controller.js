import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contact.model.js";

export const createContact = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim();
  const phone = req.body.phone?.trim();
  
  if (!name || !phone) {
    throw new ApiError(400, "Both Name and Phone fields are strictly required");
  }

  const existedContact = await Contact.findOne({ phone });
  if (existedContact) {
    throw new ApiError(400, `Phone number ${phone} is already saved under '${existedContact.name}'`);
  }

  const newContact = await Contact.create({ name, phone });
  return res.status(201).json(new ApiResponse(201, newContact, "Contact created successfully"));
});

export const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const name = req.body.name?.trim();
  const phone = req.body.phone?.trim();

  if (!name || !phone) {
    throw new ApiError(400, "Both Name and Phone are required for updates");
  }

  const duplicatePhone = await Contact.findOne({ phone, _id: { $ne: id } });
  if (duplicatePhone) {
    throw new ApiError(400, `Cannot update. Number ${phone} is already used by '${duplicatePhone.name}'`);
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, phone },
    { new: true, runValidators: true }
  );

  if (!updatedContact) {
    throw new ApiError(404, "Target contact not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedContact, "Contact updated successfully"));
});

export const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    throw new ApiError(404, "Target contact not found or already deleted");
  }

  return res.status(200).json(new ApiResponse(200, null, "Contact deleted successfully"));
});

export const getContacts = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    const trimmedSearch = search.trim();
    query = {
      $or: [
        { name: { $regex: trimmedSearch, $options: "i" } },
        { phone: { $regex: trimmedSearch, $options: "i" } },
      ],
    };
  }

  const contacts = await Contact.find(query).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, contacts, "Contacts fetched successfully"));
});