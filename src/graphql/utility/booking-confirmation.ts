import yenv from "yenv";

const env = yenv("env.yaml", { env: "development" });

export interface BookingConfirmInterface {
  name: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  serviceName: string;
  packageType: string;
  logo: string;
  servicePicture: any;
  twitter: string;
  facebook: string;
  linkedin: string;
}
export function bookingConfirmationTemplate(opts: BookingConfirmInterface) {
  const {
    name,
    reservationDate,
    startTime,
    endTime,
    serviceName,
    packageType,
    logo,
    servicePicture,
    twitter,
    facebook,
    linkedin,
  } = opts;
  
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title>Resources | Booking confirmation</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Aladin&family=Corben:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=Dancing+Script:wght@500&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Kaushan+Script&family=Montserrat:ital,wght@0,200;0,300;0,500;0,700;0,800;0,900;1,200;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Pinyon+Script&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
        />
    </head>

    <body style="margin: 0; padding: 0 !important; background: #e0e0e0; font-family: 'Inter', sans-serif;">
        <div style="background-color: #ffffff; width: 600px; margin: auto;">
            <table style="width: 100%; border-spacing: unset;">
                <tr>
                    <td style="text-align: center; padding: 0;">
                        <table style="margin: auto; background: #fff; text-align: center; width: 600px; border-spacing: unset;" id="brick_container" class="email-container">
                            <!-- header Start here -->
                            <tr>
                                <td style="width: 600px;">
                                    <table style="text-align: left; border-spacing: unset;">
                                        <tr>
                                            <td style="width: 600px;">
                                                <table style="width: 550px; border-spacing: unset;">
                                                    <tr>
                                                        <td>
                                                            <table style="width: 100%; border-spacing: unset;">
                                                                <tr>
                                                                    <td>
                                                                        <table style="text-align: center; margin: auto; border-spacing: unset;">
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#"><img src="${
                                                                                      env.REST_API_URL
                                                                                    }/upload/${logo}"  style="width:160px; height: 90px; "/></a>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <div style="height: 10px; line-height: 10px; font-size: 10px;">&nbsp;</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- header End here -->
                            <!-- Banner Start here -->
                            <tr></tr>
                            <tr>
                                <td style="width: 600px; padding: 0;">
                                    <a href="#" target="_blank"><img src="${
                                      env.REST_API_URL
                                    }/upload/${servicePicture}" style="width: 100%; display: block; height: 40vh" /></a>
                                </td>
                            </tr>
                            <!-- Banner End here -->

                            <tr>
                                <td style="width: 550px;">
                                    <table style="width: 100%; border-spacing: unset;">
                                        <tr>
                                            <td style="position: relative; top: -50px;">
                                                <div style="font-family: 'Inter', sans-serif; text-align: left; padding: 0px 30px; color: #182030; font-size: 40px; font-style: normal; font-weight: 700; line-height: 50px;">
                                                    ${serviceName.toUpperCase()}<br />
                                                    Booking Confirmed!
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="position: relative; top: -26px;">
                                                <div
                                                    style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; padding: 0px 30px;"
                                                >
                                                    Dear ${name},
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="font-family: 'Inter', sans-serif; padding: 0px 30px; text-align: left; color: #182030; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px;">
                                                    We are thrilled to inform you that your ${serviceName} booking has been successfully confirmed! Get ready for a memorable celebration filled with joy, surprises, and lots of fun.
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 600px;">
                                                <table style="text-align: left; border-spacing: unset;">
                                                    <tr>
                                                        <td style="width: 600px;">
                                                            <table style="width: 550px; margin: auto; border-spacing: unset;">
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            style="
                                                                                background-image: url(https://res.cloudinary.com/dl5sn8yvl/image/upload/v1698929596/s923cdgfll1tq8cpo0jf.svg);
                                                                                background-size: cover;
                                                                                background-position: center;
                                                                                background-repeat: no-repeat;
                                                                                min-height: 150px;
                                                                                width: 100%;
                                                                                padding: 15px 0px;
                                                                            "
                                                                        >
                                                                            <span style="color: #182030; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 700; line-height: 28px; background: none; padding: 0px 15px;">
                                                                                Here is a summary of your booking details:
                                                                            </span>
                                                                            <ul style="color: #182030; font-family: Inter; font-size: 16px; font-style: normal; line-height: 40px; margin-bottom: 0px; padding: 0 30px;">
                                                                                <li><strong>Date:</strong> ${reservationDate}</li>
                                                                                <li><strong>Time:</strong> ${startTime} - ${endTime}</li>
                                                                                <li><strong>Party package: ${packageType}</strong> </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div style="height: 10px; line-height: 10px; font-size: 10px;">&nbsp;</div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div
                                                    style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; padding: 0px 30px;"
                                                >
                                                    Once again, congratulations on confirming your booking with us! We look forward to hosting your ${serviceName} and creating unforgettable memories. If you have any questions or need
                                                    further assistance, please don't hesitate to contact us.<br />
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 550px; text-align: center;">
                                    <table style="width: 100%; border-spacing: unset;">
                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; padding: 0px 30px;"
                                                >
                                                    <br />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div
                                                    style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; padding: 0px 30px;"
                                                >
                                                    Thank You,
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div
                                                    style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; padding: 0px 30px;"
                                                >
                                                    <strong>Resources Team</strong>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; line-height: 24px; padding: 0px 30px;">
                                                    <a href="mailto:support@resources.com" style="font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: normal;">support@resources.com</a>
                                                    <a href="https://resource-reservation.hacked.com" style="font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: normal;">| www.resources.com</a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; padding: 0px 30px;"
                                                >
                                                    1234 Irvine Center Drive #200 | Irvine, CA 92618
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div style="font-family: 'Inter', sans-serif; color: #182030; text-align: left; ">
                                                    <img src="${
                                                      env.REST_API_URL
                                                    }/upload/${logo}" style="width:160px; height: 84px;"/>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div style="height: 10px; line-height: 10px; font-size: 10px;">&nbsp;</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td style="width: 100%; text-align: center; padding: 0;">
                                    <table style="width: 100%; border-collapse: unset; background: #182030; min-height: 138px;">
                                        <tr>
                                            <td>
                                                <div style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; line-height: 170%; text-align: center; color: #808285;">
                                                    <p style="color: #fff; text-align: center; font-family: Inter; font-size: 14px; font-style: normal; font-weight: 400; line-height: 170%;">
                                                      
                                                        (c) 2023 Resources. All rights reserved.
                                                    </p>
                                                    <ul style="margin: 0; padding: 0; list-style: none;">
                                                        <li style="display: inline-block; margin: 5px;">
                                                            <a href="${twitter}"><img src="https://res.cloudinary.com/dl5sn8yvl/image/upload/v1698929704/tlds1vyr5ccertp33frn.png" /></a>
                                                        </li>
                                                        <li style="display: inline-block; margin: 5px;">
                                                            <a href="${facebook}"><img src="https://res.cloudinary.com/dl5sn8yvl/image/upload/v1698929733/ol18jyzpa2hf1g7ckzv5.png" /></a>
                                                        </li>
                                                        <li style="display: inline-block; margin: 5px;">
                                                            <a href="${linkedin}"><img src="https://res.cloudinary.com/dl5sn8yvl/image/upload/v1698929765/typv8ucuqnt5suwt5giw.png" /></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>
`;
}
