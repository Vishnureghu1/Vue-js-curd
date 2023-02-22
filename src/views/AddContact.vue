<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success fw-bold">Add contact</p>
          <p class="fst-italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            obcaecati praesentium quisquam quia beatae repellendus, deleniti
            minima ex voluptates rem quae perferendis eum error reiciendis,
            exercitationem fugit quis pariatur. Repudiandae.
          </p>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="submitCreate()">
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
              <select
                class="form-control"
                v-if="groups.length > 0"
                v-model="contact.groupId"
              >
                <option value="">Select Group</option>
                <option
                  v-for="group in groups"
                  :key="group.id"
                  value="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <input type="submit" class="btn btn-success" value="create" />
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
  name: "AddContact",
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
      errorMessage: "",
      groups: [],
    };
  },
  async created() {
    try {
      let response = await ContactService.getAllGroups();
      this.groups = response.data;
    } catch (error) {
      this.errorMessage = error;
    }
  },
  methods: {
    async submitCreate() {
      console.log("submit");
      try {
        let response = await ContactService.createContact(this.contact);

        console.log("response", response.data);

        if (response) {
          return this.$router.push("/");
        } else {
          return this.$router.push("/contacts/add");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
