<script setup lang="ts">
import {
  IconArrowCircleDown,
  IconArrowCircleLeft,
  IconArrowCircleRight,
  IconArrowCircleUp,
  IconArrowDownMD,
  IconArrowLeftMD,
  IconArrowUpMD,
  IconArrowRightMD,
  IconChevronDownDuo,
  IconChevronUpDuo,
  IconChevronLeftDuo,
  IconChevronRightDuo,
  // calendar
  IconCalendarAdd,
  IconCalendarAlarm,
  IconCalendarCalendar,
  IconCalendarCheck,
  IconCalendarClock,
  IconCalendarClose,
  IconCalendarDays,
  IconCalendarEvent,
  IconCalendarTimerClose,
  IconCalendarWeek,
  // Edit
  IconEditAddMinusSquare,
  IconEditAddPlusCircle,
  IconEditAddPlusSquare,
  IconEditAttetchment,
  IconEditCleanCircle,
  IconEditCloseSquare,
  IconEditCopy,
  IconEditCrop,
  IconEditHide,
  IconEditLayers,
  IconEditMove,
  IconEditPencil,
  IconEditRemoveMinus,
  IconEditRemoveMinusCircle,
  IconEditSelectMultiple,
  IconEditShow,
  IconEditTable,
  IconEditTableAdd,
  IconEditTableRemove,
  IconEditTrash,
  // Communication
  IconCommunicationChatDots,
  IconCommunicationMail,
  IconCommunicationMailOpen,
  IconCommunicationShare,
  // Feedback
  IconFeedbackAnswer,
  IconFeedbackCheck,
  IconFeedbackDoubleCheck,
  IconFeedbackError,
  IconFeedbackInfo,
  IconFeedbackSuccess,
  IconFeedbackWarning,
  // File
  IconFileArchive,
  IconFileExport,
  IconFileFolderEdit,
  IconFileFolders,
  IconFileForderSearch,
  IconFileNoteEdit,
  IconFilePauseCircle,
  IconFilePlayCircle,
  IconFileShuffle,
  IconFileStopCircle,
  // Location
  IconLocationBuilding,
  IconLocationCar,
  IconLocationCompass,
  IconLocationFlag,
  IconLocationGlobe,
  IconLocationHouse,
  IconLocationHouseAdd,
  IconLocationHouseCheck,
  IconLocationHouseClose,
  IconLocationHouseRemove,
  IconLocationMap,
  IconLocationMapPin,
  // Miscellanea
  IconMiscellaneaCoffee,
  IconMiscellaneaCookie,
  IconMiscellaneaLeaf,
  IconMiscellaneaPlanet,
  IconMiscellaneaSun,
  // Navigation
  IconNavigationCloseM,
  IconNavigationCloseS,
  IconNavigationMoreHorizontal,
  IconNavigationMoreVertical,
  IconNavigationExternalLink,
  // System
  IconSystemBarLeft,
  IconSystemCamera,
  IconSystemData,
  IconSystemDevices,
  IconSystemImage,
  IconSystemMonitor,
  IconSystemOffline,
  IconSystemSave,
  IconSystemTabletButton,
  IconSystemTerminal,
  IconSystemWindowClose,
  // User
  IconUserUser,
  IconUserUserCircle,
} from './icons/index'
</script>

<template>
  <div class="container">
    <h2>Icons</h2>
    <div class="item">
      <h3>User</h3>
      <IconUserUser />
      <IconUserUserCircle />

    </div>
  </div>
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
./icons/index