import { In } from "typeorm";
import { ReservationForm } from "../../../database/user-interface/reservationForm";

export interface ReservationFormInterface {
  field: JSON;
  serviceId: string;
  serviceName: string;
}

export const createRerservationForm = async (
  _: any,
  { input }: { input: ReservationFormInterface }
): Promise<any> => {
  const alreadyRegistered = await checkReservationFormCreated(input?.serviceId);
  if (alreadyRegistered?.alreadyRegister) {
    throw new Error("Reservation form is already exists for this service");
  }
  const result = await insertServiceDescription(input);

  return {
    id: result.id,
    fields: result?.fields,
  };
};

export const checkReservationFormCreated = async (serviceId: string) => {
  const responseData = await ReservationForm.find({
    where: {
      isDeleted: false,
      serviceId: serviceId,
    },
  });

  return { alreadyRegister: responseData.length > 0 };
};
const insertServiceDescription = async (input: any): Promise<any> => {
  const { serviceId, serviceName, fields } = input;
  const result = await ReservationForm.createQueryBuilder()
    .insert()
    .values({
      serviceId,
      serviceName,
      fields,
    })
    .output("*")
    .execute()
    .then((response) => {
      if (!Array.isArray(response.raw) || response.raw.length === 0) {
        throw new Error("Failed to save data");
      }

      return response.raw[0];
    });

  return result;
};
export interface ReseravationFormResponse {
  id: string;
  serviceName: string;
  serviceId: string;
  fields: any;
}

export const deleteReservationForm = async (
  _: any,
  id: IdInterface
): Promise<any> => {
  try {
    const findOneReservationForm = await ReservationForm.findOne({
      where: {
        id: id?.id,
        isDeleted: false,
      },
    });
    if (findOneReservationForm) {
      findOneReservationForm.isDeleted = true;

      return await findOneReservationForm.save();
    } else {
      throw new Error("No data is deleted");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const bulkDelteReservationForm = async (
  _: any,
  ids: any
): Promise<any> => {
  try {
    const findOneReservationForm = await ReservationForm.find({
      where: {
        id: In(ids?.ids),
        isDeleted: false,
      },
    });
    if (findOneReservationForm.length) {
      await Promise.all(
        findOneReservationForm.map(async (form) => {
          form.isDeleted = true;

          return form.save();
        })
      );
    } else {
      throw new Error("No data is deleted");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export interface IdInterface {
  id: string;
}

export const updateReservationForm = async (_: any, input: any) => {
  const { id, ...rest } = input?.input;
  try {
    const data = await ReservationForm.update(
      {
        id: input?.input?.id,
      },
      {
        ...rest,
      }
    );

    if (data?.affected) {
      const formData = await ReservationForm.findOne({
        where: {
          id: input?.input?.id,
        },
      });
      
      return formData;
    } else {
      throw new Error("Data not updated");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
