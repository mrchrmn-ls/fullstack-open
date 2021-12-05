import diaryData from "../../data/diaryentries";

import { DiaryEntry } from "../types";

const diaryEntries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

function getEntries(): Array<DiaryEntry> {
  return diaryEntries;
}

function addEntry() {
  return null;
}

export default {
  getEntries,
  addEntry
};