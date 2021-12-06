import diaryEntries from "../../data/diaryentries";

import { DiaryEntry, NonSensitiveEntry } from "../types";

function getEntries(): Array<DiaryEntry> {
  return diaryEntries;
}

function getNonSensitiveEntries(): Array<NonSensitiveEntry> {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
}

function addEntry() {
  return null;
}

export default {
  getEntries,
  addEntry, 
  getNonSensitiveEntries
};