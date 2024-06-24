import { CompButton, CompButtonLinkGroup } from "@/common";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ChartBarIcon,
  ChevronDownIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Link } from "@tanstack/react-router";
import { Dayjs } from "dayjs";
import { boolean } from "zod";

type PerangkatFilterBarProps = {
  perangkatId: string;
  from: Dayjs | null;
  setFrom: (d: Dayjs | null) => void;
  to: Dayjs | null;
  setTo: (d: Dayjs | null) => void;
  mode: string;
  interval: string;
  filterChanged: (b: boolean) => void;
};

export const PerangkatFilterBar = (props: PerangkatFilterBarProps) => {
  return (
    <div className="mt-2 my-5 flex justify-between">
      <div className="flex gap-2">
        <Menu>
          <MenuButton className="bg-gray-900 text-gray-200 text-sm py-2 px-5 rounded w-fit flex gap-4 capitalize items-center">
            {props.interval} <ChevronDownIcon className="size-5" />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <MenuItems
              anchor="bottom start"
              className="bg-gray-900 text-gray-200 text-sm p-2 mt-2 rounded min-w-36 border border-gray-700"
            >
              <MenuItem>
                <Link
                  className="block p-2 mb-2 hover:bg-gray-500 rounded"
                  to="/perangkat/$perangkatId/data"
                  params={{ perangkatId: props.perangkatId }}
                  search={{ mode: props.mode, interval: "hourly" }}
                  onClick={() => props.filterChanged(true)}
                  activeProps={{
                    className: "bg-gray-500",
                  }}
                >
                  Hourly
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className="block p-2 mb-2 hover:bg-gray-500 rounded"
                  to="/perangkat/$perangkatId/data"
                  params={{ perangkatId: props.perangkatId }}
                  search={{ mode: props.mode, interval: "daily" }}
                  onClick={() => props.filterChanged(true)}
                  activeProps={{
                    className: "bg-gray-500",
                  }}
                >
                  Daily
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className="block p-2 mb-2 hover:bg-gray-500 rounded"
                  to="/perangkat/$perangkatId/data"
                  params={{ perangkatId: props.perangkatId }}
                  search={{ mode: props.mode, interval: "weekly" }}
                  onClick={() => props.filterChanged(true)}
                  activeProps={{
                    className: "bg-gray-500",
                  }}
                >
                  Weekly
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className="block p-2 mb-2 hover:bg-gray-500 rounded"
                  to="/perangkat/$perangkatId/data"
                  params={{ perangkatId: props.perangkatId }}
                  search={{ mode: props.mode, interval: "monthly" }}
                  onClick={() => props.filterChanged(true)}
                  activeProps={{
                    className: "bg-gray-500",
                  }}
                >
                  Monthly
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  className="block p-2 hover:bg-gray-500 rounded"
                  to="/perangkat/$perangkatId/data"
                  params={{ perangkatId: props.perangkatId }}
                  search={{ mode: props.mode, interval: "realtime" }}
                  onClick={() => props.filterChanged(true)}
                  activeProps={{
                    className: "bg-gray-500",
                  }}
                >
                  Realtime
                </Link>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
        <div className={`date_time flex bg-gray-900 rounded text-gray-200`}>
          <DateTimePicker
            label="Dari"
            value={props.from}
            onChange={(newValue) => {
              props.setFrom(newValue);
              props.filterChanged(true);
            }}
          />
          <DateTimePicker
            label="Hingga"
            value={props.to}
            onChange={(newValue) => {
              props.setTo(newValue);
              props.filterChanged(true);
            }}
          />
          {
            props.from && <CompButton className="border border-white rounded-full m-2">
            Reset
          </CompButton>
          }
          
        </div>
      </div>
      <CompButtonLinkGroup>
        <CompButton>
          <Link
            className={`${props.mode == "grafik" ? "bg-blue-900" : ""}`}
            to="/perangkat/$perangkatId/data"
            search={{
              mode: "grafik",
              interval: props.interval,
            }}
            params={{ perangkatId: props.perangkatId }}
            onClick={() => props.filterChanged(true)}
            activeProps={{
              className: "bg-blue-900",
            }}
          >
            <ChartBarIcon className="size-5" />
            Grafik
          </Link>
        </CompButton>
        <CompButton>
          <Link
            to="/perangkat/$perangkatId/data"
            params={{ perangkatId: props.perangkatId }}
            search={{
              mode: "tabel",
              interval: props.interval,
            }}
            onClick={() => props.filterChanged(true)}
            activeProps={{
              className: "bg-blue-900",
            }}
          >
            <ViewColumnsIcon className="size-5" />
            Tabel
          </Link>
        </CompButton>
      </CompButtonLinkGroup>
    </div>
  );
};
