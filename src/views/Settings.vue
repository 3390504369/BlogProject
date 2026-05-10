<template>
  <div class="settings">
    <div class="page-header">
      <h1 class="page-title">个人设置</h1>
      <p class="page-subtitle">管理个人信息，修改后自动保存到本地</p>
    </div>

    <div class="settings-form">
      <!-- 头像上传 -->
      <div class="form-section">
        <label class="form-label">头像</label>
        <div class="avatar-upload">
          <div class="avatar-preview">
            <img v-if="profile.avatar" :src="profile.avatar" alt="avatar" class="preview-img" />
            <span v-else class="avatar-placeholder">◈</span>
          </div>
          <div class="upload-actions">
            <button class="upload-btn" @click="triggerUpload">上传头像</button>
            <button v-if="profile.avatar" class="remove-btn" @click="removeAvatar">移除</button>
            <input ref="fileInput" type="file" accept="image/*" class="file-input" @change="handleFileChange" />
          </div>
        </div>
      </div>

      <!-- 姓名 -->
      <div class="form-section">
        <label class="form-label">姓名</label>
        <input type="text" class="form-input" :value="profile.name" @input="updateProfile({ name: $event.target.value })" placeholder="输入你的姓名" />
      </div>

      <!-- 职位 -->
      <div class="form-section">
        <label class="form-label">职位</label>
        <input type="text" class="form-input" :value="profile.title" @input="updateProfile({ title: $event.target.value })" placeholder="如：全栈工程师" />
      </div>

      <!-- 个人简介 -->
      <div class="form-section">
        <label class="form-label">个人简介</label>
        <textarea class="form-textarea" :value="profile.bio" @input="updateProfile({ bio: $event.target.value })" placeholder="介绍一下你自己" rows="5"></textarea>
      </div>

      <!-- 技术栈 -->
      <div class="form-section">
        <label class="form-label">技术栈</label>
        <div class="tech-input-row">
          <input type="text" v-model="newTech" class="form-input" placeholder="输入技术名称后按回车" @keydown.enter.prevent="addTech" />
          <button class="add-btn" @click="addTech">添加</button>
        </div>
        <div v-if="profile.techStack.length" class="tech-tags">
          <span v-for="tech in profile.techStack" :key="tech" class="tech-tag">
            {{ tech }}
            <button class="tag-remove" @click="removeTech(index)">&times;</button>
          </span>
        </div>
        <p v-else class="empty-hint">暂无技术标签，添加一个吧</p>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <span class="auto-save-hint">修改已自动保存</span>
        <button class="reset-btn" @click="confirmReset">恢复默认</button>
      </div>

      <!-- 保存提示 -->
      <transition name="fade">
        <div v-if="showToast" class="toast">{{ toastMessage }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProfile } from '../composables/useProfile'

const { profile, updateProfile, resetProfile } = useProfile()
const fileInput = ref(null)
const newTech = ref('')
const showToast = ref(false)
const toastMessage = ref('')

function triggerUpload() {
  fileInput.value?.click()
}

function handleFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 500 * 1024) {
    showToastMsg('图片大小不能超过 500KB')
    e.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    updateProfile({ avatar: ev.target.result })
    showToastMsg('头像已更新')
  }
  reader.readAsDataURL(file)
  e.target.value = ''
}

function removeAvatar() {
  updateProfile({ avatar: '' })
}

function addTech() {
  const tech = newTech.value.trim()
  if (tech && !profile.techStack.includes(tech)) {
    updateProfile({ techStack: [...profile.techStack, tech] })
  }
  newTech.value = ''
}

function removeTech(index) {
  const updated = [...profile.techStack]
  updated.splice(index, 1)
  updateProfile({ techStack: updated })
}

function confirmReset() {
  if (confirm('确定恢复默认设置吗？')) {
    resetProfile()
    showToastMsg('已恢复默认设置')
  }
}

function showToastMsg(msg) {
  toastMessage.value = msg
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>

<style scoped>
.settings {
  max-width: 650px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  padding: 40px 0;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.settings-form {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.15);
}

.form-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
}

.form-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.15);
}

.form-textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

/* Avatar */
.avatar-upload {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.avatar-preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.3s ease;
}

.avatar-preview:hover {
  border-color: var(--primary);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 32px;
  color: var(--text-secondary);
}

.upload-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.upload-btn {
  padding: 8px 20px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.upload-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
}

.remove-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.remove-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.file-input {
  display: none;
}

/* Tech Stack */
.tech-input-row {
  display: flex;
  gap: 10px;
}

.tech-input-row .form-input {
  flex: 1;
}

.add-btn {
  padding: 8px 20px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 8px;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-family: inherit;
}

.add-btn:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: var(--primary);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--primary);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.4);
}

.tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  line-height: 1;
}

.tag-remove:hover {
  background: #ef4444;
  color: white;
}

.empty-hint {
  color: var(--text-secondary);
  font-size: 0.85rem;
  opacity: 0.6;
}

/* Form Actions */
.form-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
}

.auto-save-hint {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-style: italic;
}

.reset-btn {
  padding: 12px 32px;
  background: transparent;
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.reset-btn:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 28px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

/* Responsive */
@media (max-width: 768px) {
  .settings-form {
    padding: 20px;
    gap: 24px;
  }

  .avatar-upload {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .upload-actions {
    justify-content: center;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .form-actions {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .reset-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
