import { api } from "./axiosClient";


export const createExpense = (data) =>
  api.post("/expenses", data).then(res => res.data);


export const getExpenses = (search="") =>
  api.get("/expenses",{
    params: {
      search
    },
  }).then(res => res.data);


export const deleteExpense = (id) =>
  api.delete(`/expenses/${id}`).then(res => res.data);


export const updateExpense = (id, data) =>
  api.put(`/expenses/${id}`, data).then(res => res.data);

export const getExpenseById = (id) =>
  api.get(`/expenses/${id}`).then((res) => res.data);
