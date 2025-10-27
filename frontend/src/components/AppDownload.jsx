import React from 'react'

const AppDownload = () => {
  return (
    <div className='flex items-center justify-center py-3'>
      <div class="bg-white text-sm border border-gray-500/30 p-8 rounded-md m-2 max-w-xl w-full">
            <p class="font-medium text-blue-600 mb-1 cursor-pointer">Download Now!</p>
            <h2 class="text-2xl font-semibold text-gray-800">Download our mobile app.</h2>
            <p class="text-gray-800/80 mt-1">Mobile banking app for IOS & Android to<br />manage your online money.</p>
            <div class="flex items-center gap-4 mt-6">
                <button class="active:scale-95 transition-all" type="button">
                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtnBlack.svg"
                        alt="googlePlayBtnBlack" />
                </button>
                <button class="active:scale-95 transition-all" type="button">
                    <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtnBlack.svg"
                        alt="appleStoreBtnBlack" />
                </button>
            </div>
        </div>
    </div>
  )
}

export default AppDownload
