import React,{Fragment} from 'react'
import { Menu,Transition} from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa"
function Reportdropdown() {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
  return (
    <div>
        <Menu as="div" className="relative  text-left w-auto h-auto items-center">
      <div className='flex items-center gap-2 ml-3 mr-8'>
        <Menu.Button className="inline-flex items-center w-full justify-center rounded-md  px-4 py-2 font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-lg">
          Reports
          <FaChevronDown className="ml-36 w-3 h-3 flex "/>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-center z-50 absolute right-0 mt-2 w-56 max-h-60 overflow-auto rounded-md shadow-lg bg-dropdown ring-1 ring-black ring-opacity-5 focus:outline-none ">
  <div className="py-1">
    <Menu.Item>
      {({ active }) => (
        <a
          className={`${
            active ? 'bg-blue-500 text-white' : 'text-white'
          } flex justify-between w-full px-4 py-2 text-sm cursor-pointer`}
        >
          Total Miles
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          className={`${
            active ? 'bg-blue-500 text-white' : 'text-white'
          } flex justify-between w-full px-4 py-2 text-sm cursor-pointer`}
        >
          Energy Consumption
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          className={`${
            active ? 'bg-blue-500 text-white' : 'text-white'
          } flex justify-between w-full px-4 py-2 text-sm cursor-pointer`}
        >
          Cost Analysis
        </a>
      )}
    </Menu.Item>
  </div>
</Menu.Items>
      </Transition>
    </Menu>
    </div>
  )
}

export default Reportdropdown