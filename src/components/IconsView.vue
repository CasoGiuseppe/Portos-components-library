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
      <h3>Arrows</h3>
      <IconArrowCircleUp></IconArrowCircleUp>
      <IconArrowCircleDown></IconArrowCircleDown>
      <IconArrowCircleLeft></IconArrowCircleLeft>
      <IconArrowCircleRight></IconArrowCircleRight>
      <!-- MD -->
      <IconArrowUpMD></IconArrowUpMD>
      <IconArrowDownMD></IconArrowDownMD>
      <IconArrowLeftMD></IconArrowLeftMD>
      <IconArrowRightMD></IconArrowRightMD>
      <!-- DUO -->
      <IconChevronUpDuo></IconChevronUpDuo>
      <IconChevronDownDuo></IconChevronDownDuo>
      <IconChevronLeftDuo></IconChevronLeftDuo>
      <IconChevronRightDuo></IconChevronRightDuo>
    </div>
    <div class="item">
      <h3>Calendar</h3>
      <!-- Calendar -->
      <IconCalendarAdd></IconCalendarAdd>
      <IconCalendarAlarm></IconCalendarAlarm>
      <IconCalendarCalendar></IconCalendarCalendar>
      <IconCalendarCheck></IconCalendarCheck>
      <IconCalendarClock></IconCalendarClock>
      <IconCalendarClose></IconCalendarClose>
      <IconCalendarDays></IconCalendarDays>
      <IconCalendarEvent></IconCalendarEvent>
      <IconCalendarTimerClose></IconCalendarTimerClose>
      <IconCalendarWeek></IconCalendarWeek>
    </div>
    <div class="item">
      <h3>Comunication</h3>
      <IconCommunicationChatDots />
      <IconCommunicationMail />
      <IconCommunicationMailOpen />
      <IconCommunicationShare />
    </div>
    <div class="item">
      <h3>Edit</h3>
      <IconEditAddMinusSquare />
      <IconEditAddPlusCircle />
      <IconEditAddPlusSquare />
      <IconEditAttetchment />
      <IconEditCleanCircle />
      <IconEditCloseSquare />
      <IconEditCopy />
      <IconEditCrop />
      <IconEditHide />
      <IconEditLayers />
      <IconEditMove />
      <IconEditPencil />
      <IconEditRemoveMinus />
      <IconEditRemoveMinusCircle />
      <IconEditSelectMultiple />
      <IconEditShow />
      <IconEditTable />
      <IconEditTableAdd />
      <IconEditTableRemove />
      <IconEditTrash />
    </div>
    <div class="item">
      <h3>Feedback</h3>
      <IconFeedbackAnswer />
      <IconFeedbackCheck />
      <IconFeedbackDoubleCheck />
      <IconFeedbackError />
      <IconFeedbackInfo />
      <IconFeedbackSuccess />
      <IconFeedbackWarning />
    </div>
    <div class="item">
      <h3>File</h3>
      <IconFileArchive />
      <IconFileExport />
      <IconFileFolderEdit />
      <IconFileFolders />
      <IconFileForderSearch />
      <IconFileNoteEdit />
      <IconFilePauseCircle />
      <IconFilePlayCircle />
      <IconFileShuffle />
      <IconFileStopCircle />
    </div>
    <div class="item">
      <h3>Location</h3>
      <IconLocationBuilding />
      <IconLocationCar />
      <IconLocationCompass />
      <IconLocationFlag />
      <IconLocationGlobe />
      <IconLocationHouse />
      <IconLocationHouseAdd />
      <IconLocationHouseCheck />
      <IconLocationHouseClose />
      <IconLocationHouseRemove />
      <IconLocationMap />
      <IconLocationMapPin />
    </div>
    <div class="item">
      <h3>Miscellanea</h3>
      <IconMiscellaneaCoffee />
      <IconMiscellaneaCookie />
      <IconMiscellaneaLeaf />
      <IconMiscellaneaPlanet />
      <IconMiscellaneaSun />
    </div>
    <div class="item">
      <h3>Navigation</h3>
      <IconNavigationCloseM />
      <IconNavigationCloseS />
      <IconNavigationMoreHorizontal />
      <IconNavigationMoreVertical />
      <IconNavigationExternalLink />

    </div>
    <div class="item">
      <h3>System</h3>
      <IconSystemBarLeft />
      <IconSystemCamera />
      <IconSystemData />
      <IconSystemDevices />
      <IconSystemImage />
      <IconSystemMonitor />
      <IconSystemOffline />
      <IconSystemSave />
      <IconSystemTabletButton />
      <IconSystemTerminal />
      <IconSystemWindowClose />
    </div>
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