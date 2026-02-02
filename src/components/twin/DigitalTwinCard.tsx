import type { DigitalTwin } from "../../types/types";

interface Props {
  twin: DigitalTwin;
}

const DigitalTwinCard: React.FC<Props> = ({ twin }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-4 rounded-lg border border-blue-300 hover:scale-105 transform transition-all">
      <h2 className="text-xl font-bold">{twin.name}</h2>
      <p className="text-gray-600 mb-2">{twin.behavior}</p>
      <p>Attention: {twin.attention}%</p>
      <progress
        className="progress progress-success w-full mb-2"
        value={twin.attention}
        max={100}
      ></progress>
      <p>Absence: {twin.absence}%</p>
      <progress
        className="progress progress-secondary w-full"
        value={twin.absence}
        max={100}
      ></progress>
      <button className="btn btn-primary btn-sm mt-2 w-full">
        Lancer Simulation
      </button>
    </div>
  );
};

export default DigitalTwinCard;