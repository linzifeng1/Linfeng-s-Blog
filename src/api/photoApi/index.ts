import service from "../base";

const getData = (data: {
  page: number,
  size: number,
  order: string,
}) => {
  return service.get("/m2/6452962-6151685-default/300450857", { params: data });
}

export {
  getData
}