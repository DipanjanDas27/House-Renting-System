import { motion } from "motion/react"
import { MapPin, IndianRupee, Home } from "lucide-react"
import { memo } from "react"

const PropertySearch = ({ search, minPrice, maxPrice, onSearchChange, onMinPriceChange, onMaxPriceChange, onSearch, onReset }) => {

  const hasValue = search || minPrice || maxPrice

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 0.68, 0, 1.1] }}
    >
      <div className="bg-beige-card rounded-card shadow-card-md flex items-center px-8 h-25 gap-3 w-full">

        <div className="flex-1 flex items-center gap-2.5 bg-beige-input rounded-btn h-14.5 px-4 text-brown-muted hover:shadow-md transition-shadow duration-150">
          <MapPin size={20} className="shrink-0 text-brown-muted" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Location"
            className="bg-transparent border-none outline-none font-bold text-[17px] text-brown-muted placeholder:text-brown-muted w-full"
          />
        </div>

        <div className="w-px h-10 bg-brown-dark/15 shrink-0" />

        <div className="flex-1 flex items-center gap-2.5 bg-beige-input rounded-btn h-14.5 px-4 text-brown-muted">
          <IndianRupee size={20} className="shrink-0 text-brown-muted" />
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder="Min Price"
            className="bg-transparent border-none outline-none font-bold text-[17px] text-brown-muted placeholder:text-brown-muted w-full"
          />
        </div>

        <div className="w-px h-10 bg-brown-dark/15 shrink-0" />

        <div className="flex-1 flex items-center gap-2.5 bg-beige-input rounded-btn h-14.5 px-4 text-brown-muted">
          <Home size={20} className="shrink-0 text-brown-muted" />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Max Price"
            className="bg-transparent border-none outline-none font-bold text-[17px] text-brown-muted placeholder:text-brown-muted w-full"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {hasValue && (
            <motion.button
              onClick={onReset}
              className="h-14.5 px-5 border border-beige-card bg-beige-input text-brown-dark font-semibold text-[15px] rounded-btn hover:bg-beige-card transition-colors duration-150"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.96 }}
            >
              Clear
            </motion.button>
          )}
          <motion.button
            onClick={onSearch}
            className="h-14.5 px-9 bg-brown-dark text-white font-semibold text-[18px] rounded-btn whitespace-nowrap hover:bg-[#1a0f09] transition-colors duration-150"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Find Home
          </motion.button>
        </div>

      </div>
    </motion.div>
  )
}

export default memo(PropertySearch)