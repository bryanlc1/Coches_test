import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import {useLocation} from "react-router-dom"

const navigation = [
    { name: 'Users', href: '/' },
    { name: 'Cars', href: '/cars' },
  ]
  
  function classNames(...classes : any[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function Navbar(){

    const route =  useLocation();

    return(
        <Disclosure as="nav" className="">
        {({ open }) => (
          <>
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.href === route.pathname  ? 'border-b-2 border-gray-900 ' :'hover:border-b-2 border-gray-900 ',
                            'px-3 py-2 text-sm font-medium text-gray-700'
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> 
                    <button className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-red-500 '>
                        reset
                    </button>
                </div>
              </div>
            
  
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                    <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.href === route.pathname ? 'bg-gray-900 text-white' : null,
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}
                            >
                          {item.name}
                        </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}