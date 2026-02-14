import React, { useEffect, useState } from 'react'
import { categories } from '~/constants';
import type { searchFilters } from '~/interfaces';

const TransactionsList = () => {
  const [filters, setFilters] = useState<searchFilters>({
    search: '',
    category:'All',
    range:'Today'
  });

  useEffect(() => {
    fetchTransactions(filters);
  }, [filters]);

  const fetchTransactions = (filters:{}) => {

  }
  
  return (
    <div className='flex flex-col'>
      <div className='p-10 flex flex-row justify-between'>

        <div className='flex flex-row gap-5 p-1 rounded-md bg-[#f5efe6]'>
          <input type='radio' name='range' id='today'/>
          <label htmlFor='today' className='rounded-md'>Today</label>
          <input type="radio" name="range" id="week"/>
          <label htmlFor="week" className='rounded-md'>This Week</label>
          <input type="radio" name="range" id="month"/>
          <label htmlFor="month" className='rounded-md'>This Month</label>
          <input type="radio" name="range" id="custom"/>
          <label htmlFor="custom" className='rounded-md'>
            <span className="icon cursor-pointer">📅</span> Custom Range
          </label>
        </div>
        <div>
          <input type='search' placeholder='Search Transations...' className='bg-white p-3 rounded-md border border-[#f5efe6] outline-[#e8e1d5]' required></input>
        </div>
      </div>
      
      <div>
        <input type='checkbox' name='category' id='All-Categories' />
        <label htmlFor='All-Categories' className='rounded-3xl border border-[#f5efe6] m-5'>All Categories</label>
        {categories.map((category) => (
          <>
            <input type='checkbox' name='category' id={category}/>
            <label htmlFor={category} className='rounded-3xl border border-[#f5efe6] m-5'>{category}</label>
          </>
        ))}
      </div>

      

      <div className="m-10 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-2xl">
          <table className="w-full text-sm text-left rtl:text-right text-body bg-white">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default bg-bg-app">
                  <tr>
                      <th scope="col" className="px-6 py-3 font-medium">
                          Date
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                          Category
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                          Description
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                          Amount
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-neutral-primary border-b border-default">
                      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                          Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                          Silver
                      </td>
                      <td className="px-6 py-4">
                          Laptop
                      </td>
                      <td className="px-6 py-4">
                          $2999
                      </td>
                      <td className="px-6 py-4">
                          231
                      </td>
                  </tr>
                  <tr className="bg-neutral-primary border-b border-default">
                      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                          Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4">
                          White
                      </td>
                      <td className="px-6 py-4">
                          Laptop PC
                      </td>
                      <td className="px-6 py-4">
                          $1999
                      </td>
                      <td className="px-6 py-4">
                          423
                      </td>
                  </tr>
                  <tr className="bg-neutral-primary">
                      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                          Magic Mouse 2
                      </th>
                      <td className="px-6 py-4">
                          Black
                      </td>
                      <td className="px-6 py-4">
                          Accessories
                      </td>
                      <td className="px-6 py-4">
                          $99
                      </td>
                      <td className="px-6 py-4">
                          121
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

    </div>
  )
}

export default TransactionsList