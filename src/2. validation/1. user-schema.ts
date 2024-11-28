import { z } from "zod";
import { zPhoneNumber, zString } from "@2. validation/reusable-shema";

const userSchmea = (mandatory = true) =>
  z
    .object({
      first_name: zString({ name: "First Name", mandatory }),
      last_name: zString({ name: "Last Name", mandatory }),
      username: zString({ name: "Username", mandatory }),
      email: zString({
        name: "Email",
        mandatory,
      }),
      password: zString({
        name: "Password",
        mandatory,
      }),
      phone_number: zPhoneNumber({
        name: "PhoneNumber",
        mandatory,
      }),
      image: zString({
        name: "Image",
        mandatory,
      }),
      id_profession: zString({
        name: "ID Profession",
        mandatory,
      }),
      
    })
    .strict();

export default userSchmea;
