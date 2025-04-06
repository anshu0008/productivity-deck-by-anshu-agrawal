import classNames from "classnames";
import { Tab } from "neetoui";

const Tabs = ({ activeTab, setActiveTab, settings }) => (
  <div className="mt-4 flex w-full justify-center">
    <Tab noUnderline>
      {Object.keys(settings).map(mode => (
        <Tab.Item
          active={activeTab === mode}
          key={mode}
          className={classNames(
            "focus:outline-none cursor-pointer rounded-lg px-10 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-200",
            {
              "bg-gray-200": activeTab === mode,
            }
          )}
          onClick={() => setActiveTab(mode)}
        >
          {mode}
        </Tab.Item>
      ))}
    </Tab>
  </div>
);
export default Tabs;
