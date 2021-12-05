import diaryEntries from "../../data/diaryentries";

import { DiaryEntry } from "../types";

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