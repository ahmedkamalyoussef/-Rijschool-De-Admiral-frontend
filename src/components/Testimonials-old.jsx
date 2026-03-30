import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Jan de Vries',
      date: 'Januari 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiICRqWfqrlSm5K4E4kYYHnPks7Wn29r-Eh7r0IK5rCXyNaYH-KEXhZtcNNyU-3aOrosf3uHl17yP7FMzh4IRHxPkH3xIL2Y4q847sxZmUq5X_aRjp3at265yJXDtf49F3dBBbsCA9ZWnVnc0DMUWiwInMPpTJpySRywsiW3x7UX8u4mN3N0Uj9xEUY4nNfPbaGi6E9HkLasSHZsv5R-b-H0iKeXeD67bYVRvIJK9EX-Rif2kOfxSr9aHglDLjzhVvHqKy4URm7a4',
      alt: 'Portrait of a happy young man smiling after passing his driving test, outdoors in Amsterdam city background',
      quote: 'Dankzij de geduldige lessen van De Admiraal ben ik in één keer geslaagd. Top ervaring!'
    },
    {
      name: 'Sarah Bakker',
      date: 'December 2023',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpvjRHWvhCnqW4mmdU3NOG1nwhA71xdPQBRNrYUC3VcOf4Oj3Ma8gMlqplibjDLe6Ibr0RAbEoZkfxZgEGsk-gq2R9i9czny40i2Km284D6NbbXff2PZWLgFyEbV6xsFhYVTj0GCyWfpg_L2cr1DKzop0K8S4ndg51OLIJk5tVzUR4ssPCKDNrM85OfPWIuTh38tUvitsb34C5IGRURwEeP1MKRxW1C2QyJk_fpRfrsTH0308EeQzqIy76HlARsxfizzHP3UitjOQ',
      alt: 'Portrait of a confident young woman leaning against a driving school car with a successful smile',
      quote: 'De flexibele planning was perfect voor mijn drukke studie. Echt een aanrader!'
    },
    {
      name: 'Mohamed Ali',
      date: 'November 2023',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXXBOX-OS4NG42nS0HHPXPC6bNNuY35U3DUfy5aI4g4GLAQgiF0YFRJZGGnmOW3XTpoM_DFAq3asXucWFSKTAjcvGOf_rDlCL8IKI8DtQeF3SkWlcmtjRCHVXw49GRB7Hmi--fKv6NaJJVdCLhgGCbdXF7EOaN0bRHcMs08UldM4B0xIqK9YTg7qrcJm3kJjDPLVzugcc4VHXU2SWUQcxMJClClaPWp_drklS4zRZY0Zmt6nbQAlPMHFnmDb6GGgG6gDUsCBJGAqs',
      alt: 'Portrait of a young man holding his driving license proudly with an urban Amsterdam background',
      quote: 'Zeer professionele instructeurs die precies weten hoe ze je moeten klaarstomen.'
    }
  ];

  return (
    <section className="py-24 bg-surface-container-high relative overflow-hidden" id="afgestudeerden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <h2 className="text-4xl font-headline font-extrabold text-center mb-16 tracking-tight text-on-surface">
          Onze Trots: Recente Geslaagden
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl mb-6" 
                alt={testimonial.alt}
                src={testimonial.image}
              />
              <h4 className="font-headline font-bold text-lg text-on-surface mb-1">
                {testimonial.name}
              </h4>
              <p className="text-xs font-label text-primary font-bold tracking-widest uppercase mb-4">
                {testimonial.date}
              </p>
              <p className="text-on-surface-variant italic leading-relaxed font-serif">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
