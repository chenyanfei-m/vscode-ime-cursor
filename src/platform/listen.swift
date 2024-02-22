import Carbon
import Foundation

func checkCurrentInputMethod() {
    let inputSource = TISCopyCurrentKeyboardInputSource().takeRetainedValue()
    let inputSourceID = TISGetInputSourceProperty(inputSource, kTISPropertyInputSourceID)

    if let inputSourceIDString = Unmanaged<CFString>.fromOpaque(inputSourceID!).takeUnretainedValue() as String? {
        print("\(inputSourceIDString)")
        fflush(stdout)
    }
}

let callback: CFNotificationCallback = { center, observer, name, object, userInfo in
    guard let name = name?.rawValue as String? else { return }

    if name == kTISNotifySelectedKeyboardInputSourceChanged as String {
        checkCurrentInputMethod()
    }
}

checkCurrentInputMethod()

CFNotificationCenterAddObserver(CFNotificationCenterGetDistributedCenter(),
                                nil,
                                callback,
                                kTISNotifySelectedKeyboardInputSourceChanged as CFString,
                                nil,
                                CFNotificationSuspensionBehavior.deliverImmediately)

RunLoop.current.run()
