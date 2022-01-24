import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const episode = {
    id: 1,
    name: "",
    image:
      "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "test summary",
    runtime: 1
  };

  const episodeNoImage = {
    id: 1,
    name: "",
    image:"null",
    season: 1,
    number: 1,
    summary: "test summary",
    runtime: 1
  };



test("renders without error", () => {
    render(<Episode episode={episode}/>);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={episode} />);
   const summary = screen.queryByText(/test summary/i);
   expect(summary).toBeInTheDocument();
   expect(summary).toBeTruthy();
   expect(summary).toHaveTextContent(/test summary/i);
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={episodeNoImage} />);
   const image = screen.queryByAltText('./stranger_things.png')
   expect(image).toBeFalsy();
});
