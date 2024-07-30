import { Footer } from "../../../database/footer/footer";
import { Services } from "../../../database/services/service";
import { ServiceDescription } from "../../../database/services/service-description";
import { Header } from "../../../database/user-interface/navbar";

export const HomePage = async (_: any) => {
  const findHeader = await Header.find({
    where: {
      isDeleted: false,
    },
  });
  const findFooter = await Footer.find({
    where: {
      isDeleted: false,
    },
  });
  const findServiceDescription = await ServiceDescription.find({
    where: {
      isDeleted: false,
    },
  });
  const findService = await Services.find({
    take: 5,
    where: {
      isDeleted: false,
      priority: true
    },
  });

  return {
    header: findHeader[0],
    footer: {
      id: findFooter[0]?.id,
      footerLogo: findFooter[0]?.footerLogo,
      footerDescription: findFooter[0]?.footerDescription,
      socialMedia: [
        {
          facebook: findFooter[0]?.facebook,
          twitter: findFooter[0]?.twitter,
          instagram: findFooter[0]?.instagram,
          linkedin: findFooter[0]?.linkedin,
        },
      ],
    },
    serviceDescription: findServiceDescription[0],
    services: findService,
  };
};
