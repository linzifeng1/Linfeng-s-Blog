import { service } from "../base.ts";

const getData = (data: {
  page: number,
  size: number,
}) => {
  return service.get("m2/6452962-6151685-default/301081172", { params: data });
}

export {
  getData
}