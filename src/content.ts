'use strict';

import "./content.css";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts
import $ from 'jquery';

// Fetch 

const checkForEpics = () => {
  const board = $('#ghx-work #ghx-pool-column');
  let epics = board.find('.ghx-swimlane')

  // Remove issues without epics
  epics = epics.filter((index, epic) => {
    return $(epic).find('.ghx-swimlane-header.ghx-swimlane-default').length !== 1;
  });

  
  const epicsInfo = epics.map((index, epic) => fetchEpicInfo(epic)).toArray();

  // Add buttons
  epicsInfo.forEach(({ title, epicKey, element }) => {

    const heading = $(element).find('.ghx-heading span[role="button"]');
    heading.text('')

    const link = document.createElement('a');
    link.innerText = title;
    link.target = "_blank";
    link.href = `/browse/${epicKey}`;
    link.style.color = 'inherit';

    heading.append(link);

  })

}

/** Fetch information for the epic */
const fetchEpicInfo = (epic: HTMLElement) => {
  const title = $(epic).find('.ghx-heading > span[role="button"]').text(); // Epic title
  const epicKey = $(epic).find('[data-epickey]').attr('data-epickey'); // Epic key

  return { title, epicKey, element: epic }
}

checkForEpics();
