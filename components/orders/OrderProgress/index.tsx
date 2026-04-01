import cn from 'classnames'
import Image from 'next/image'
import { getListSteps } from '../helper'

interface IOrderProgress {
  steps: ReturnType<typeof getListSteps>
}

const OrderProgress: React.FC<IOrderProgress> = ({ steps }) => {
  console.log('steps :>> ', steps)
  const status = steps
    .slice()
    .reverse()
    .find((s) => s.passed)?.title // const currentStep = getCurrentStep(trackingInfo?.order_status)
  return (
    <div className="min-h-[200px] rounded-2xl border border-gray-400 bg-white p-3.5 md:p-10">
      <div>
        <div className="text:xs md:text-sm">Status:</div>
        <div className="mt-1 text-[20px] font-bold md:text-[25px]">
          {status || steps?.[0]?.title}
        </div>
        {/* <div className="mt-2 text-sm md:mt-[14px] md:text-base">      
          Expected by Tuesday, 12th September
        </div> */}
      </div>
      {steps.length > 1 && (
        <div className="relative mt-6 md:mt-12">
          <div className="relative z-1 flex">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  'relative flex flex-1 flex-col items-center gap-3 md:gap-4',
                  index !== 0 && [
                    'before:absolute before:right-1/2 before:z-[-1] before:h-1.5 before:w-full',
                    'md:before:top-[47px] md:before:h-3.5',
                    step.passed
                      ? 'before:bg-primary'
                      : 'before:border-[0.5px] before:border-[#686868] before:bg-[#F8F8F8]',
                    steps.length < 5
                      ? 'before:top-[22px]'
                      : 'before:top-[19px]',
                  ]
                )}
              >
                <div
                  className={cn([
                    'relative h-[50px] w-[50px] rounded-full bg-white md:h-[108px] md:w-[108px]',
                    steps.length < 5 ? 'h-[50px] w-[50px]' : 'h-11 w-11',
                    step.passed
                      ? 'border-primary border-2'
                      : 'border border-[#686868]',
                  ])}
                >
                  <Image
                    src={step.imageSrc}
                    fill
                    alt=""
                    className="object-contain"
                    sizes="(max-width: 768px) 50px, 108px"
                  />
                </div>
                <div>
                  <div
                    className={cn([
                      'text-center md:text-base',
                      step.passed
                        ? 'text-sub-primary font-medium'
                        : 'text-black',
                      steps.length < 5 ? 'text-[11px]' : 'text-[9px]',
                    ])}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-6 z-0 w-full md:top-[47px]">
            {/* <div className="flex">
              {Array.from(new Array(steps.length - 1)).map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`h-[6px] flex-1 md:h-[14px] ${
                      steps[index + 1].passed
                        ? 'bg-[#B780F0]'
                        : 'border-[0.5px] border-[#686868] bg-[#F8F8F8]'
                    } `}
                  />
                )
              })}
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderProgress
