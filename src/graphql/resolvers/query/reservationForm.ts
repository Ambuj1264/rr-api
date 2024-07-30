import { ReservationForm } from "../../../database/user-interface/reservationForm";
import { IdInterface } from "../../mutations/user-interface-mutation/ReservationForm";

export const reservationFormAllData = async (_: any) => {
  try {
        return await ReservationForm.find({
      where: {
        isDeleted: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const reservationFormSingleData= async(_: any,id:IdInterface)=>{
  try {
      const formData=  await ReservationForm.findOne({
        where:{
          id: id?.id
        }
      })
      if(formData){
        return formData;
      }else{
        throw new Error("Data is not find");
      }
  } catch (error:any) {
    throw new Error(error.message);
  }
}

export const reservationFormSingleDataForUI= async(_: any,serviceId:any)=>{
  try {
      const formData=  await ReservationForm.findOne({
        where:{
          serviceId: serviceId?.serviceId
        }
      })
      if(formData){
        return formData;
      }else{
        throw new Error("Data is not find");
      }
  } catch (error:any) {
    throw new Error(error.message);
  }
}