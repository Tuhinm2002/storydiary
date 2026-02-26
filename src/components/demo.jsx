<div className="bg-neutral-100 text-neutral-800">
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-atma">
          {content.title[0]}
        </h1>
        <p className="max-w-2xl text-neutral-400 text-lg md:text-xl">
          {content.contentEng[0]}
        </p>
      </section>

      {/* Content Sections */}
      {content.image.map((img, index) => (
        <section
          key={index}
          className="min-h-screen flex items-center px-6 py-20"
        >
          <div
            className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
              <img
                src={img}
                alt={content.title[index]}
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-1 text-sm font-semibold bg-white/10 rounded-full">
                Section {index + 1}
              </span>

              <h2 className="text-3xl md:text-5xl font-bold">
                {content.title[index]}
              </h2>

              <div className="text-neutral-800 space-y-4 text-lg leading-relaxed">
                {content.contentEng[index]}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="py-16 text-center text-neutral-500">
        © 2026 Bhoot. All rights reserved.
      </footer>
    </div>