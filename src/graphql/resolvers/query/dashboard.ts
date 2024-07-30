import { Between } from "typeorm";
import { Reservation } from "../../../database/user-interface/reservation";
// import { Between } from "typeorm";

export const dashboard = async (_: any) => {
  try {
    const currentDate = new Date();
    const previousDate = new Date();
    // Set the previous date, for example, 30 days before the current date
    previousDate.setDate(currentDate.getDate() - 1); // Change this according to your requirement
    const endOfToday = new Date(previousDate);
    endOfToday.setHours(0, 0, 0, 0);
    const lastTimeOfPrevious = new Date(endOfToday);
    lastTimeOfPrevious.setHours(23, 59, 59, 0);
    const reservationsCount = await Reservation.count({
      where: {
        isDeleted: false,
        createdAt: Between(endOfToday, lastTimeOfPrevious), // Filtering based on createdAt column
      },
    });

    const totalReservations = await Reservation.count({
      where: {
        isDeleted: false,
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastTime = new Date();
    lastTime.setHours(23, 59, 59, 0);

    const currentReservation = await Reservation.count({
      where: {
        isDeleted: false,
        createdAt: Between(today, lastTime),
      },
    });
    const percentageDifference =
      ((-reservationsCount + currentReservation) / totalReservations) * 100;

    // Calculate the previous 5 days from today
    const dateRanges = Array.from({ length: 6 }, (_, index) => {
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - index);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // To set it to the end of the day
      
      return { startDate, endDate };
    }).slice(0, -1); // Remove the current day from the list

    const totals: any[] = [];
    for (const range of dateRanges) {
      const { startDate, endDate } = range;
      const totalPackagePrice = await Reservation.createQueryBuilder();
      const data = await totalPackagePrice
        .select(
          "SUM(CAST(reservation.packagePrice AS NUMERIC))",
          "totalPackagePrice"
        )
        .from(Reservation, "reservation")
        .where("reservation.isDeleted = :isDeleted", { isDeleted: false })
        .andWhere("reservation.createdAt BETWEEN :startDate AND :endDate", {
          startDate,
          endDate,
        })
        .getRawOne();
      totals.push({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalPackagePrice: data.totalPackagePrice || 0,
      });
    }
    // Return or do something with the calculated data
    
    return {
      totalReservations,
      percentageDifference: percentageDifference.toFixed(2),
      totals,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
