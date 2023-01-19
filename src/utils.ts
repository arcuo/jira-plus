import $ from 'jquery';

/** Find the ID of the board through the breadcrumb component. */
export const getBoardId = () => {
  const breadcrumbs = $('[data-testid="rapidboard-breadcrumbs"]');
  const lastBreadCrumb = breadcrumbs.find('li:last-child');
  const boardUrl = lastBreadCrumb.find('a').attr('href');
  const boardId = boardUrl?.split('/').pop();
  return boardId;
};

export type EpicInfo = {
  title: string;
  epicKey?: string;
  element: HTMLElement;
}

/** Fetch information for the epic */
export const fetchEpicInfo = (epic: HTMLElement): EpicInfo => {
  const title = $(epic).find('.ghx-heading > span[role="button"]').text(); // Epic title
  const epicKey = $(epic).find('[data-epickey]').attr('data-epickey'); // Epic key

  return { title, epicKey, element: epic };
};

/** Get all epics in the kanban board page */
export const getEpics = () => {
  const board = $('#ghx-work #ghx-pool-column');
  let epics = board.find('.ghx-swimlane');

  // Remove issues without epics
  epics = epics.filter((index, epic) => {
    return (
      $(epic).find('.ghx-swimlane-header.ghx-swimlane-default').length !== 1
    );
  });

  return epics;
};
