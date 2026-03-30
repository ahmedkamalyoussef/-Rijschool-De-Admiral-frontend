import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f1f6ff] relative overflow-hidden" id="afgestudeerden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-center mb-12 sm:mb-16 tracking-tight text-[#091d2e]">Onze Trots: Recente Geslaagden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Testimonial 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-gray-100">
              <img 
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiICRqWfqrlSm5K4E4kYYHnPks7Wn29r-Eh7r0IK5rCXyNaYH-KEXhZtcNNyU-3aOrosf3uHl17yP7FMzh4IRHxPkH3xIL2Y4q847sxZmUq5X_aRjp3at265yJXDtf49F3dBBbsCA9ZWnVnc0DMUWiwInMPpTJpySRywsiW3x7UX8u4mN3N0Uj9xEUY4nNfPbaGi6E9HkLasSHZsv5R-b-H0iKeXeD67bYVRvIJK9EX-Rif2kOfxSr9aHglDLjzhVvHqKy4URm7a4"
              />
            </div>
            <h4 className="font-headline font-bold text-xl sm:text-2xl text-[#091d2e] mb-2">Jan de Vries</h4>
            <p className="text-xs sm:text-sm font-label text-[#b03500] font-bold tracking-widest uppercase mb-4">Januari 2024</p>
            <p className="text-gray-600 italic leading-relaxed text-base sm:text-lg">"Dankzij de geduldige lessen van De Admiraal ben ik in één keer geslaagd. Top ervaring!"</p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-gray-100">
              <img 
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpvjRHWvhCnqW4mmdU3NOG1nwhA71xdPQBRNrYUC3VcOf4Oj3Ma8gMlqplibjDLe6Ibr0RAbEoZkfxZgEGsk-gq2R9i9czny40i2Km284D6NbbXff2PZWLgFyEbV6xsFhYVTj0GCyWfpg_L2cr1DKzop0K8S4ndg51OLIJk5tVzUR4ssPCKDNrM85OfPWIuTh38tUvitsb34C5IGRURwEeP1MKRxW1C2QyJk_fpRfrsTH0308EeQzqIy76HlARsxfizzHP3UitjOQ"
              />
            </div>
            <h4 className="font-headline font-bold text-xl sm:text-2xl text-[#091d2e] mb-2">Sarah Bakker</h4>
            <p className="text-xs sm:text-sm font-label text-[#b03500] font-bold tracking-widest uppercase mb-4">December 2023</p>
            <p className="text-gray-600 italic leading-relaxed text-base sm:text-lg">"De flexibele planning was perfect voor mijn drukke studie. Echt een aanrader!"</p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 bg-gray-100">
              <img 
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXXBOX-OS4NG42nS0HHPXPC6bNNuY35U3DUfy5aI4g4GLAQgiF0YFRJZGGnmOW3XTpoM_DFAq3asXucWFSKTAjcvGOf_rDlCL8IKI8DtQeF3SkWlcmtjRCHVXw49GRB7Hmi--fKv6NaJJVdCLhgGCbdXF7EOaN0bRHcMs08UldM4B0xIqK9YTg7qrcJm3kJjDPLVzugcc4VHXU2SWUQcxMJClClaPWp_drklS4zRZY0Zmt6nbQAlPMHFnmDb6GGgG6gDUsCBJGAqs"
              />
            </div>
            <h4 className="font-headline font-bold text-xl sm:text-2xl text-[#091d2e] mb-2">Mohamed Ali</h4>
            <p className="text-xs sm:text-sm font-label text-[#b03500] font-bold tracking-widest uppercase mb-4">November 2023</p>
            <p className="text-gray-600 italic leading-relaxed text-base sm:text-lg">"Zeer professionele instructeurs die precies weten hoe ze je moeten klaarstomen."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
