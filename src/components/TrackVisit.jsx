import useTrackVisit from '../hooks/useTrackVisit';

// Wraps a route's element to record one "playground" visit when it mounts, without touching
// the page component itself. Used only for the 8 Learning Playground routes in App.jsx.
export default function TrackVisit({ itemKey, children }) {
  useTrackVisit('playground', itemKey);
  return children;
}
