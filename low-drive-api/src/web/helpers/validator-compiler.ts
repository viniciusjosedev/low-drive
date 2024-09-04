import joi from "joi";

export default ({ schema }: any) => {
  return (data: any) => (schema as joi.ObjectSchema).validate(data);
};
