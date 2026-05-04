function WarningBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <p className="text-center text-sm text-amber-800">
          <span className="font-semibold">Student Project:</span> This is a demo application for educational purposes. Not affiliated with any cryptocurrency exchange. Do not enter real personal information.
        </p>
      </div>
    </div>
  )
}

export default WarningBanner