<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons">
            <div v-if="admin" @click="editBlog" class="icon">
                <Edit class="edit"></Edit>
            </div>
            <div v-if="admin" @click="deletePost" class="icon">
                <Delete class="delete"></Delete>
            </div>
        </div>
        <img :src="post.blogCoverPhoto" alt="">
        <div class="info">
            <h4>{{ post.blogTitle }}</h4>

            <div class="tags-display">
                <span>Tag:</span>
                <span v-for="(tag, index) in (post.tags ? post.tags.join(', ').split(', ') : [])" :key="index"
                    class="tag">
                    "{{ tag.trim() }}"
                </span>
            </div>

            <h6>Publicado: {{ new Date(post.blogDate).toLocaleString("es-ES", { dateStyle: "long" }) }}</h6>

            <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }">Ver
                <Arrow class="arrow" />
            </router-link>
        </div>
    </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";

export default {
    name: "blogCard",
    props: ["post"],
    components: {
        Arrow,
        Edit,
        Delete,
    },
    mounted() {
        console.log(this.post);  // Verifica que los datos del post, incluyendo los tags, estén presentes
    },
    methods: {
        deletePost() {
            this.$store.dispatch("deletePost", this.post.blogID);
        },

        editBlog() {
            this.$router.push({ name: "EditBlog", params: { blogid: this.post.blogID } });
        },
    },
    computed: {
        editPost() {
            return this.$store.state.editPost;
        },

        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileRole === 'admin';
        },
    }
};
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: 0.5s ease all;

            &:hover {
                background-color: #303030;

                .edit,
                .delete {
                    path {
                        fill: #fff;
                    }
                }
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: #000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: bold;
        }

        h6 {
            font-weight: 400;
            font-size: 14px;  /* Aumenté el tamaño de la fuente */
            padding-top: 20px;  /* Añadí más espacio superior */
            padding-bottom: 20px;  /* Añadí más espacio inferior */
            margin-top: 16px;  /* Aumento del margen superior para separarlo de los tags */
            color: #777;  /* Opcional: para darle un color más suave */
        }

        .tags-display {
            margin-top: 12px;
            font-size: 16px;

            span:first-child {
                font-weight: bold;
            }

            .tag {
                font-size: 18px;
                margin-left: 8px;
                padding: 4px 8px;
                background-color: #e0e0e0;
                border-radius: 4px;
            }
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            padding-top: 20px;
            font-size: 12px;
            padding-bottom: 4px;
            transition: 0.5s ease-in all;

            &:hover {
                color: rgba(48, 48, 48, 0.8);
            }

            .arrow {
                width: 10px;
            }
        }
    }
}
</style>