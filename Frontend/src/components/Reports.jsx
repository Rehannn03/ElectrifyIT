import React from 'react'
import Header from './Header'
import Reportdropdown from './Reportdropdown'
import Frequencydropdown from './Frequencydropdown'
import TimeDropdown from './TimeDropdown'
import DatePickerValue from './DatePicker'

function Reports() {
  
  return (
    <>
    <div className='flex gap-4 mt-10'>
        <Reportdropdown/>
        <Frequencydropdown/>
        <TimeDropdown/>
        <DatePickerValue/>
      </div>
    
    </>
  )
}

export default Reports
