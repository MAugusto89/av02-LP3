export interface Contact extends Document {
  id: string;
  titulo: string;
  area: string;
  autor: Date;
}

const schema = new Schema<Contact>({
  id: { type: String, required: true },
  titulo: { type: String, required: true },
  area: { type: String, required: true },
  autor: { type: Date, required: true },
});

export const ContactModel = model<Contact>("Contact", schema);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateTrabalhosInputs = (contactObj: any) => {
  const { id, titulo, area, autor } = contactObj;

  const errorMessages: string[] = [];

  if (!id) {
    errorMessages.push("Name cannot be empty");
  }

  if (!titulo) {
    errorMessages.push("Invalid email");
  }

  if (!area) {
    errorMessages.push("Phone must follow pattern (00) 00000-0000");
  }
  if (!autor) {
    errorMessages.push("Phone must follow pattern (00) 00000-0000");
  }
  return errorMessages;
};
