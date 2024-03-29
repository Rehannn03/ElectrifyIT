import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa"
import DatePickerValue from './DatePicker'
function TimeDropdown() {
  return (
    <div>
        <div>
        <Menu as="div" className="relative text-left w-auto h-auto items-center">
      <div className='flex items-center gap-2 ml-3 mr-8'>
        <Menu.Button className="flex items-center w-full justify-center rounded-md  px-4 py-2 font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-lg">
          Time Period
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
       <div>
        <DatePickerValue/>
       </div>
      </Transition>
    </Menu>
    </div>
    </div>
  )
}

export default TimeDropdown