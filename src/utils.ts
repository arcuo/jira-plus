export const getBoardId = () => {
  const breadcrumbs = $('[data-testid="rapidboard-breadcrumbs"]');
  const lastBreadCrumb = breadcrumbs.find('li:last-child');
  const boardUrl = lastBreadCrumb.find('a').attr('href');
  const boardId = boardUrl?.split('/').pop();
  return boardId;
};
