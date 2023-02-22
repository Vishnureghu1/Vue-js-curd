<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Edit contact</p>
          <p class="fst-italic">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque,
            cum iusto. Dolorum, odit ipsa accusamus rem eum animi sed atque,
            dicta officia, asperiores culpa quod molestias inventore laborum non
            nesciunt.
          </p>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="updateSubmit()">
            <div class="mb-2">
              <input
                type="text"
                v-model="contact.name"
                class="form-control"
                placeholder="Name"
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                v-model="contact.photo"
                class="form-control"
                placeholder="Photo URL"
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                v-model="contact.email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                v-model="contact.mobile"
                class="form-control"
                placeholder="Mobile"
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                v-model="contact.company"
                class="form-control"
                placeholder="Company"
              />
            </div>
            <div class="mb-2">
              <input
                type="text"
                v-model="contact.title"
                class="form-control"
                placeholder="Title"
              />
            </div>
            <div class="mb-2">
              <select class="form-control" v-model="contact.groupId">
                <option>Select Group</option>
                <option
                  v-for="group in groups"
                  :key="group.id"
                  :value="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <input type="submit" class="btn btn-success" value="Update" />
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <img :src="contact.photo" alt="" class="contact-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContactService } from "../services/contactservice";
export default {
  name: "Edit contact",
  data() {
    return {
      contact: {
        name: "",
        photo: "",
        email: "",
        mobile: "",
        company: "",
        title: "",
        groupId: "",
      },
      contactId: this.$route.params.contactId,
      loading: false,
      contact: {},
      errorMessage: null,
      groups: [],
    };
  },
  async created() {
    try {
      this.loading = true;
      let response = await ContactService.getContact(this.contactId);
      let groupResponse = await ContactService.getAllGroups();
      this.contact = response.data;
      this.groups = groupResponse.data;
      this.loading = false;
    } catch (error) {
      this.errorMessage = error;
    }
  },
  methods: {
    async updateSubmit() {
      console.log("call");
      try {
        let response = await ContactService.updateContact(
          this.contact,
          this.contactId
        );
        console.log("response", response);
        if (response) {
          return this.$router.push("/");
        } else {
          return this.$router.push(`/contacts/edit/${this.contactId}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
