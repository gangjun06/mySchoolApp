import { parseISO } from "date-fns";
import { Time } from "../models/etc";

export const parseTime = (time: Time): Date => parseISO(time);
