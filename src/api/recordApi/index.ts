import service from "../base";

const getData = (data: {
  page: number,
  size: number,
}) => {
  return service.get("/m2/6452962-6151685-default/303123483", { params: data });
}

export {
  getData
}