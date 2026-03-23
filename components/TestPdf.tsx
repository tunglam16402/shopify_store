// export const TestPdf = () => {
//   return (
//     <div className="">
//       <object
//         data="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
//         type="application/pdf"
//         className="h-[90dvh] w-full max-w-full bg-transparent p-0 sm:max-w-full"
//         style={{
//           WebkitOverflowScrolling: 'touch', // smooth scroll trên iPad
//         }}
//       >
//         <embed
//           src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
//           type="application/pdf"
//           className="h-full w-full rounded-xl"
//         />
//       </object>
//     </div>
//   )
// }

export const TestPdf = () => {
  return (
    <div
      className="h-[90dvh] w-full overflow-auto"
      style={{
        WebkitOverflowScrolling: 'touch', // smooth scroll trên iPad
      }}
    >
      <iframe
        src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
        className="min-h-[1500px] w-full border-none"
        allowFullScreen
      />
    </div>
  )
}
