import ReactSlider from "react-slider";

export default function DurationSlider({ durationRange, setDurationRange, allowedDurations }) {
  return (
    <div className="main__block-filter">
      <h3>продолжительность пребывания</h3>
      <ReactSlider
        className="range-slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        min={0}
        max={allowedDurations.length - 1}
        value={durationRange.map((value) => allowedDurations.indexOf(value))}
        onChange={(indexes) => setDurationRange(indexes.map((index) => allowedDurations[index]))}
        minDistance={1}
      />
      <p>
        От <span>{durationRange[0]}</span> до <span>{durationRange[1]}</span> ночей
      </p>
    </div>
  );
}
