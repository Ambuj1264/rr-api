import MailService from "../../../config/mailService";
import { Reservation } from "../../../database/user-interface/reservation";
import yenv from "yenv";
import { bookingConfirmationTemplate } from "../../utility/booking-confirmation";
import { Header } from "../../../database/user-interface/navbar";
import { Services } from "../../../database/services/service";
import { Footer } from "../../../database/footer/footer";
const env = yenv("env.yaml", { env: "development" });
interface ReservationInput {
  reservationForm: any;
  serviceId: string;
  serviceName: string;
  packages: any;
  reservationDate: string;
  packagePrice: string;
  packageType: string;
}

const createReservation = async (
  _: any,
  { input }: { input: ReservationInput }
) => {
  try {
    const {
      reservationForm,
      serviceId,
      serviceName,
      packages,
      packagePrice,
      packageType,
    } = input;

    const reservationData = await Reservation.create({
      reservationForm,
      serviceId,
      serviceName,
      packages,
      packagePrice,
      packageType,
    });

    const result = await reservationData.save();
    if (result) {
      const findLogo = await Header.findOne({
        where: {
          isDeleted: false,
        },
      });
      const serviceImage = await Services.findOne({
        where: {
          id: serviceId,
          isDeleted: false,
        },
      });
      const findFooter = await Footer.findOne({
        where: {
          isDeleted: false,
        },
      });

      const servicePicture = serviceImage?.serviceImageName
        ? serviceImage?.serviceImageName
        : "";
        let DataOfReservation :any=  result?.reservationForm
      const logo = findLogo?.imageName ? findLogo?.imageName : "";
      const mailService = MailService.getInstance();
      await mailService.sendMail("123", {
        to: reservationForm?.email,
        from: env.SMTP_SENDER,
        subject: "Booking confirmation from resource reservation",
        html: bookingConfirmationTemplate({
          name: reservationForm?.name,
          reservationDate:DataOfReservation.reservationDate,
          startTime: DataOfReservation.startTime,
          endTime: DataOfReservation.endTime,
          serviceName: serviceName,
          packageType: packageType,
          logo: logo,
          servicePicture: servicePicture,
          facebook: findFooter?.facebook ? findFooter?.facebook : "",
          twitter: findFooter?.twitter ? findFooter?.twitter : "",
          linkedin: findFooter?.linkedin ? findFooter?.linkedin : "",
        }),
      });

      return result;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { createReservation };
