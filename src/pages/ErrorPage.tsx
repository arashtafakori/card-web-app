import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;

  let message = null;
  if(error !== null)
  {
    if(error.statusText !== undefined && null)
      message =   error.statusText;
    else if(error.message !== undefined && null)
      message =   error.message;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message == null && 'The page was not found.'}</i>
        <i>{message != null && message}</i>
      </p>
    </div>
  );
}