import ModalActionButtons from './ModalActionButtons'
import TimeRoller from './TimeRoller'

export default function TimePicker() {
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className="h-206pxr w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        <div className="flex items-center justify-center border-b border-[#979797] py-10pxr">
          <span className="text-white">Choose Time</span>
        </div>
        <div className="flex h-106pxr items-center px-43pxr py-21pxr">
          <div className="mr-13pxr">
            <TimeRoller timeType={'H'} />
          </div>
          <div className="mr-14pxr">:</div>
          <div className="mr-16pxr">
            <TimeRoller timeType={'M'} />
          </div>
          <div>
            <TimeRoller timeType={'AmPm'} />
          </div>
        </div>
        <ModalActionButtons
          saveTitle={'Save'}
          saveHandler={() => {}}
          cancelTitle={'Cancel'}
          cancelHandler={() => {}}
        />
      </div>
    </div>
  )
}
