import React from 'react'
import logo from "../assets/logo.jpg"


const Footer = () => {
  return (
    <div>
      <footer class="px-6 font-playfair text-slate-100 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-[#98958e] max-sm:pb-20">
        <div class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">
            <div class="md:max-w-96">
                <div className='flex items-center gap-4'>
                    <img src={logo} className='w-10 rounded-md' alt="" />
                    <p className='text-xl font-bold'>CELESTIQUE</p>
                </div>
                <p class="mt-6 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>
            <div class="flex-1 flex items-start md:justify-end gap-20">
                <div>
                    <h2 class="font-semibold text-lg mb-5">Company</h2>
                    <ul class="text-sm space-y-2">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Privacy policy</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="font-semibold text-lg mb-5">Subscribe to our newsletter</h2>
                    <div class="text-sm space-y-2">
                        <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                        <div class="flex max-sm:flex-col items-center gap-2 pt-4">
                            <input class="border border-gray-200 placeholder-gray-100 focus:ring-2 ring-slate-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
                            <button class="bg-gray-700 w-24 h-9 text-white rounded max-sm:px-4">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="pt-4 text-center text-xs md:text-sm pb-5">
            Copyright 2024 © <a href="https://prebuiltui.com">SDKING DEV</a>. All Right Reserved.
        </p>
    </footer>
    </div>
  )
}

export default Footer