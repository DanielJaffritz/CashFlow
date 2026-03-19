
const Foot = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-1 p-5 pt-20 mt-20 border-t border-general-text">
      <div className="flex flex-col w-full md:w-1/3">
        <div className="flex flex-row items-center">
          <img src="/favicon.png" width={50} height={5} />
          <p className="text-2xl font-bold">CashFlow</p>
        </div>
        <p className="text-general-text">Building future the future of personal and professional wealth management with data and integrity</p>
      </div>
      <div className="flex flex-col gap-0 md:gap-2">
        <h1 className="text-general-text">PRODUCT</h1>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Features</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Integrations</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Pricing</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Security</p>
      </div>
      <div className="flex flex-col gap-0 md:gap-2">
        <h1 className="text-general-text">COMPANY</h1>
        <p className="hover:text-amber-400 cursor-pointer transition-all">About</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Careers</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Contact</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Blog</p>
      </div>
      <div className="flex flex-col gap-0 md:gap-2">
        <h1 className="text-general-text">LEGAL</h1>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Privacy</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Terms</p>
        <p className="hover:text-amber-400 cursor-pointer transition-all">Cookie Policy</p>
      </div>
    </div>

  )
}

export default Foot
