import { ref } from "vue"
import ModalDialog from "@/components/modal/ModalDialog.vue"
import BaseButton from "@/components/base/base-button/BaseButton.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"

export default {
    title: "Modal/ModalDialog",
    component: ModalDialog
}

interface ModalArgs {
    size: string
    headerText?: string
    onAction1: () => void
}

const Template = (args: ModalArgs) => ({
    components: { ModalDialog, BaseButton, BaseIcon },
    setup() {
        const showModal = ref(false)
        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        const closeModal = () => {
            showModal.value = false
        }
        return { args, showModal, toggleModal, closeModal }
    },
    template: `
    <div>
      <button @click="toggleModal" style="border: 1px solid grey">Open Modal</button>
      <ModalDialog :id="'modal-3234'" v-if="showModal" :size="args.size" @close="closeModal">
        <template #header>
          This is the modal header
        </template>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut lectus non velit tincidunt posuere. Nam ac augue quis sapien facilisis dapibus a in magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer nunc dolor, sodales in orci a, mollis viverra massa. Morbi suscipit imperdiet nulla et tincidunt. Integer eget dolor at magna
        <template #actions>
          <BaseButton @click="args.onAction1">Do something!</BaseButton>
          <BaseButton  @click="closeModal">Dismiss</BaseButton>
        </template>
      </ModalDialog>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut lectus non velit tincidunt posuere. Nam ac augue quis sapien facilisis dapibus a in magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer nunc dolor, sodales in orci a, mollis viverra massa. Morbi suscipit imperdiet nulla et tincidunt. Integer eget dolor at magna lacinia vehicula. Nulla id justo dapibus nunc dictum facilisis nec a dui. Pellentesque finibus tellus lorem, tempor sagittis magna laoreet at. Duis dapibus dolor ultrices pharetra tempor. Sed commodo dui ut pretium consequat. Nullam porta dictum eros quis posuere. Vivamus a magna id magna maximus fermentum at a leo. Quisque condimentum tristique posuere. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Curabitur facilisis, sapien id feugiat bibendum, erat mauris dignissim ipsum, eu consectetur dui orci ac est. Vestibulum ultricies auctor arcu, eget malesuada metus fringilla ac. Cras placerat enim ut mauris euismod semper. Integer turpis lacus, lacinia at tellus in, sodales convallis tortor. Mauris auctor vel massa non rhoncus. Nam varius sed purus a gravida. Vestibulum tempor imperdiet elementum. Phasellus id nisl ac eros rutrum eleifend a vel nulla. Quisque dictum iaculis magna, eu convallis neque. Pellentesque dictum purus a fringilla egestas. Nam vel odio vitae enim facilisis condimentum tincidunt nec lacus.
      Mauris nulla nisi, gravida ut luctus in, pretium ac eros. Donec ut urna ut mauris posuere pharetra at vel est. Duis id dolor molestie, pharetra mauris in, varius est. Phasellus non enim ac nibh accumsan sollicitudin vel eu nisl. Phasellus fringilla vitae magna ut commodo. Praesent eget luctus metus. In aliquet ipsum sed nisi porta, et fringilla ligula rhoncus. Vivamus dignissim dictum elit, vel interdum ligula imperdiet vitae. Mauris tincidunt erat non justo porttitor, sed maximus nisi rhoncus. Donec justo nisi, suscipit nec lacinia vel, finibus ac dui. Sed blandit sapien eget quam porttitor commodo quis vel lacus. Sed ipsum enim, feugiat ac neque a, tempor pharetra ante. Praesent gravida finibus risus nec cursus.
      Duis congue leo a velit dignissim, a venenatis odio tempus. Nam ut fringilla quam. Vestibulum ac egestas tellus. Nunc ultrices, lorem eu placerat congue, lacus velit consequat tellus, sed pulvinar mauris dolor a nulla. Nam diam arcu, viverra ac magna a, semper feugiat augue. Quisque tincidunt leo et sem dignissim pharetra. Curabitur a augue sed elit auctor ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus ipsum felis. Aliquam et urna id lacus efficitur egestas. Proin id libero sed dui efficitur posuere ut ac dui. Cras tincidunt ornare neque nec volutpat. Pellentesque faucibus tellus enim, ut bibendum ipsum vulputate id.
      Ut cursus augue vitae risus pellentesque, eu posuere lorem aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla condimentum vulputate iaculis. Cras libero elit, congue sit amet elit ac, consequat laoreet purus. Aenean quam enim, malesuada nec volutpat maximus, malesuada id ligula. Aenean nec ultrices libero. Pellentesque imperdiet tellus quis hendrerit egestas. Sed tortor turpis, sagittis sed justo et, eleifend commodo orci. Quisque nec tellus velit. Vestibulum mauris metus, commodo id purus sed, ultrices consectetur justo. Nulla id nulla nulla. Donec turpis tellus, venenatis eu mollis ac, faucibus venenatis nisl. Curabitur ac libero id mi ullamcorper placerat non a nisl.</p>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
    size: "narrow",
    onAction1: () => alert("Action 1")
}
