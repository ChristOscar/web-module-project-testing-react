import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
    //add in approprate test data structure here.
    name: "Chapter One: The Vanishing of Will Byers",
    summary: "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
    seasons:[
        {id:0, name: "Season 1", episodes: []}, 
        {id:1, name: "Season 2", episodes: []}, 
        {id:2, name: "Season 3", episodes: []}, 
        {id:3, name: "Season 4", episodes: []}
      ]
}



test('renders without errors', ()=>{
    render(<Show show={testShow} selectedSeason="none" />);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);

    const loading = screen.getByText(/Fetching data/i);

    expect(loading).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow}  selectedSeason="none"/>);

    const options = screen.queryAllByTestId("season-option");

    expect(options).toHaveLength(4);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();

    //Arrange: render our component isFetchingData = false
    render(<Show show={testShow}  handleSelect={handleSelect} selectedSeason="none"/>);

    //Act: click button
    const button = screen.getByText(/seasons/i);
    userEvent.click(button);

    //Assert: check if getData was called once
    expect(handleSelect.mock.calls.length === 4).toBeTruthy();
    expect(handleSelect.mock.calls.length).toBe(4);
    expect(handleSelect.mock.calls).toHaveLength(4);
    expect(handleSelect).toBeCalledTimes(4);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show selectedSeason={"none"}/>);
    let season = screen.queryAllByTestId("season-option");
    expect(season).toHaveLength(0);

    rerender(<Show selectedSeason={"Season 1"}/>);
    season = screen.queryAllByTestId("season-option");
    expect(season).toHaveLength(0);
    // expect(season).toBeInTheDocument();
});
